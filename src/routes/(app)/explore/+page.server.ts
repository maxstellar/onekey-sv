import { db } from '$lib/server/db';
import { projects, users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load() {
	const rows = await db
		.select({
			id: projects.id,
			name: projects.name,
			description: projects.description,
			screenshotUrl: projects.screenshotUrl,
			demoUrl: projects.demoUrl,
			approvedSeconds: projects.approvedSeconds,
			authorName: users.slackDisplayName,
			authorNickname: users.nickname,
		})
		.from(projects)
		.innerJoin(users, eq(projects.userId, users.id))
		.where(eq(projects.status, 'approved'));

	return { projects: rows };
}
