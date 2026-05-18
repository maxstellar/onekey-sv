<script lang="ts">
	const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	const months = [
		'january',
		'february',
		'march',
		'april',
		'may',
		'june',
		'july',
		'august',
		'september',
		'october',
		'november',
		'december'
	];

	const now = new Date();
	const dateLabel = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;

	const quests = [
		{ label: '[complete hardware prototype]', pct: 40 },
		{ label: '[submit firmware pull request]', pct: 0 },
		{ label: '[document assembly process]', pct: 75 }
	];
</script>

<svelte:head>
	<title>onekey - home</title>
</svelte:head>

<p class="eyebrow">{dateLabel}</p>
<h1 class="greeting">welcome back, [name]</h1>

<div class="bento">
	<div class="card quests">
		<span class="card-label">quests</span>
		<ul class="quest-list">
			{#each quests as q (q.label)}
				<li class="quest-row">
					<span class="quest-dot"></span>
					<span class="quest-name">{q.label}</span>
					<div class="quest-track">
						<div class="quest-fill" style="width: {q.pct}%"></div>
					</div>
				</li>
			{/each}
		</ul>
	</div>

	<div class="card">
		<span class="card-label">[section]</span>
	</div>

	<div class="card">
		<span class="card-label">[section]</span>
	</div>

	<div class="card card-wide">
		<span class="card-label">[section]</span>
	</div>

	<div class="card card-sm">
		<span class="card-label">[section]</span>
	</div>
</div>

<style>
	.eyebrow {
		font-size: 0.68rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--rail-label);
		margin: 0 0 0.6rem;
	}

	.greeting {
		font-size: clamp(2.5rem, 3.5vw, 3.5rem);
		font-weight: bold;
		letter-spacing: -0.03em;
		line-height: 1;
		margin: 0 0 2.5rem;
	}

	.bento {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(0.75rem, 1.2vw, 1.75rem);
	}

	.card {
		background: var(--color-bg-soft);
		border-radius: var(--radius-card);
		padding: clamp(1rem, 1.5vw, 1.75rem) clamp(1.1rem, 1.5vw, 1.75rem);
		min-height: clamp(8rem, 12vh, 16rem);
		box-sizing: border-box;
	}

	.card.quests {
		grid-column: span 2;
		min-height: clamp(11rem, 16vh, 22rem);
	}

	.card.card-wide {
		grid-column: span 2;
	}

	.card.card-sm {
		min-height: clamp(4rem, 6vh, 8rem);
	}

	.card-label {
		display: block;
		font-size: clamp(0.6rem, 0.7vw, 0.85rem);
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--rail-label);
		margin-bottom: 1.25rem;
	}

	.quest-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.quest-row {
		display: grid;
		grid-template-columns: 1rem 1fr 5rem;
		align-items: center;
		gap: 0.75rem;
	}

	.quest-dot {
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 50%;
		border: 1.5px solid var(--rail-label);
	}

	.quest-name {
		font-size: 0.875rem;
		color: var(--color-text-soft);
	}

	.quest-track {
		height: 2px;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 9999px;
		overflow: hidden;
	}

	.quest-fill {
		height: 100%;
		background: var(--color-text);
		border-radius: 9999px;
	}
</style>
