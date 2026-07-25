import { db } from './db';
import { projects, projectApprovals, shopOrders, balanceAdjustments } from './db/schema';
import { eq, and, sum, notInArray } from 'drizzle-orm';

export async function getAllAvailableSeconds(): Promise<Map<string, number>> {
	const approvedRows = await db
		.select({ userId: projects.userId, total: sum(projectApprovals.approvedSeconds) })
		.from(projectApprovals)
		.innerJoin(projects, eq(projectApprovals.projectId, projects.id))
		.where(eq(projectApprovals.status, 'approved'))
		.groupBy(projects.userId);

	const spentRows = await db
		.select({ userId: shopOrders.userId, total: sum(shopOrders.priceSeconds) })
		.from(shopOrders)
		.where(notInArray(shopOrders.status, ['cancelled', 'refunded']))
		.groupBy(shopOrders.userId);

	let adjustedRows: { userId: string; total: string | null }[] = [];
	try {
		adjustedRows = await db
			.select({ userId: balanceAdjustments.userId, total: sum(balanceAdjustments.seconds) })
			.from(balanceAdjustments)
			.groupBy(balanceAdjustments.userId);
	} catch {
		// table may not exist yet before migration runs
	}

	const balances = new Map<string, number>();
	for (const row of approvedRows) {
		balances.set(row.userId, (balances.get(row.userId) ?? 0) + Number(row.total ?? 0));
	}
	for (const row of spentRows) {
		balances.set(row.userId, (balances.get(row.userId) ?? 0) - Number(row.total ?? 0));
	}
	for (const row of adjustedRows) {
		balances.set(row.userId, (balances.get(row.userId) ?? 0) + Number(row.total ?? 0));
	}

	return balances;
}

export async function getAvailableSeconds(dbUserId: string): Promise<number> {
	const [r] = await db
		.select({ total: sum(projectApprovals.approvedSeconds) })
		.from(projectApprovals)
		.innerJoin(projects, eq(projectApprovals.projectId, projects.id))
		.where(and(eq(projects.userId, dbUserId), eq(projectApprovals.status, 'approved')));
	const approved = Number(r?.total ?? 0);

	const [s] = await db
		.select({ total: sum(shopOrders.priceSeconds) })
		.from(shopOrders)
		.where(and(eq(shopOrders.userId, dbUserId), notInArray(shopOrders.status, ['cancelled', 'refunded'])));
	const spent = Number(s?.total ?? 0);

	let adjusted = 0;
	try {
		const [a] = await db
			.select({ total: sum(balanceAdjustments.seconds) })
			.from(balanceAdjustments)
			.where(eq(balanceAdjustments.userId, dbUserId));
		adjusted = Number(a?.total ?? 0);
	} catch {
		// table may not exist yet before migration runs
	}

	return approved - spent + adjusted;
}
