<script>
	const RADIUS = 45;
	const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

	let url = $state('');
	let loading = $state(false);
	let error = $state('');
	/** @type {{ scores: Record<string, number>, issues: any[] } | null} */
	let result = $state(null);

	/** @param {number} score */
	function scoreBand(score) {
		if (score >= 90) return 'good';
		if (score >= 50) return 'ok';
		return 'bad';
	}

	/** @param {number} score */
	function dashOffset(score) {
		return CIRCUMFERENCE * (1 - score / 100);
	}

	async function runAudit() {
		const trimmed = url.trim();
		if (!trimmed) return;
		const target = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

		loading = true;
		error = '';
		result = null;

		try {
			const res = await fetch('/api/audit', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url: target })
			});
			const data = await res.json();
			if (!res.ok) error = data.error;
			else result = data;
		} catch {
			error = 'Something went wrong. Please try again.';
		}

		loading = false;
	}

	/** @param {KeyboardEvent} e */
	function onKey(e) {
		if (e.key === 'Enter' && !loading) runAudit();
	}
</script>

<svelte:head>
	<title>Bilan: a plain-language website health check</title>
	<meta
		name="description"
		content="Bilan checks your website's speed, accessibility and SEO, then explains what to fix in plain language. Paste a link and get your results in seconds."
	/>
</svelte:head>

<header class="topbar">
	<span class="logo">Bilan</span>
</header>

<main>
	<section class="hero">
		<h1>Is your website healthy?</h1>
		<p>Paste your website address and get a quick health check, explained in plain language.</p>

		<div class="search">
			<input
				bind:value={url}
				onkeydown={onKey}
				placeholder="example.com"
				aria-label="Website address"
			/>
			<button onclick={runAudit} disabled={loading || !url.trim()}>
				{loading ? 'Checking...' : 'Check my site'}
			</button>
		</div>
	</section>

	{#if loading}
		<div class="loading" role="status">
			<div class="spinner"></div>
			<p>Checking your site… this usually takes about 20 seconds.</p>
		</div>
	{/if}

	{#if error}<p class="error" role="alert">{error}</p>{/if}

	{#if result}
		<section class="scores" aria-label="Scores">
			{#each Object.entries(result.scores) as [name, score] (name)}
				<div class="gauge {scoreBand(score)}">
					<svg viewBox="0 0 100 100" aria-hidden="true">
						<circle class="track" cx="50" cy="50" r={RADIUS} />
						<circle
							class="progress"
							cx="50"
							cy="50"
							r={RADIUS}
							stroke-dasharray={CIRCUMFERENCE}
							stroke-dashoffset={dashOffset(score)}
						/>
					</svg>
					<strong>{score}</strong>
					<span>{name}</span>
				</div>
			{/each}
		</section>

		<section class="report">
			<h2>Your care plan</h2>
			{#if result.issues.length === 0}
				<p class="all-good">Nothing major to fix. Well done!</p>
			{/if}
			<ul class="issues">
				{#each result.issues as issue (issue.id)}
					<li class="issue">
						<span class="tag {issue.category}">{issue.category}</span>
						<h3>{issue.title}</h3>
						{#if issue.why}
							<p><strong>Why it matters:</strong> {issue.why}</p>
						{/if}
						{#if issue.fix}
							<p><strong>How to fix it:</strong> {issue.fix}</p>
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</main>

<style>
	:global(body) {
		margin: 0;
		background: #faf7f2;
		color: #1f1a17;
		font-family:
			'DM Sans',
			system-ui,
			-apple-system,
			'Segoe UI',
			sans-serif;
		font-weight: 400;
		line-height: 1.6;
	}
	:global(h1, h2, h3) {
		font-weight: 500;
	}
	:global(strong) {
		font-weight: 500;
	}

	.topbar {
		padding: 1rem 1.5rem;
		border-bottom: 1px solid #e8e2d9;
	}
	.logo {
		font-size: 1.25rem;
		font-weight: 500;
		color: #0f766e;
		letter-spacing: 0.02em;
	}
	main {
		max-width: 720px;
		margin: 0 auto;
		padding: 2rem 1rem 4rem;
	}

	.hero {
		text-align: center;
		padding: 2rem 0;
	}
	.hero h1 {
		font-size: clamp(1.75rem, 5vw, 2.5rem);
		margin: 0 0 0.5rem;
	}
	.hero p {
		margin: 0 0 1.5rem;
		color: #5c5249;
	}

	.search {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	.search input {
		flex: 1 1 260px;
		padding: 0.85rem 1rem;
		font-size: 1rem;
		border: 1px solid #cfc7bb;
		border-radius: 8px;
		background: #fff;
	}
	.search input:focus {
		outline: 2px solid #0f766e;
		outline-offset: 1px;
	}
	.search button {
		padding: 0.85rem 1.5rem;
		font-size: 1rem;
		font-weight: 500;
		color: #fff;
		background: #0f766e;
		border: none;
		border-radius: 8px;
		cursor: pointer;
	}
	.search button:hover:not(:disabled) {
		background: #0b5e57;
	}
	.search button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.loading {
		text-align: center;
		padding: 2rem 0;
		color: #5c5249;
	}
	.spinner {
		width: 36px;
		height: 36px;
		margin: 0 auto 1rem;
		border: 4px solid #e8e2d9;
		border-top-color: #0f766e;
		border-radius: 50%;
		animation: spin 0.9s linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.error {
		padding: 0.85rem 1rem;
		color: #b00020;
		background: #fdecea;
		border-radius: 8px;
	}

	.scores {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.5rem;
		margin: 2rem 0;
	}
	.gauge {
		position: relative;
		width: 130px;
		text-align: center;
	}
	.gauge svg {
		width: 130px;
		height: 130px;
		transform: rotate(-90deg);
	}
	.gauge circle {
		fill: none;
		stroke-width: 8;
	}
	.gauge .track {
		stroke: #e8e2d9;
	}
	.gauge .progress {
		stroke-linecap: round;
		transition: stroke-dashoffset 0.8s ease;
	}
	.gauge strong {
		position: absolute;
		top: 38px;
		left: 0;
		right: 0;
		font-size: 2.2rem;
		font-weight: 300;
	}
	.gauge span {
		display: block;
		margin-top: 0.25rem;
		font-weight: 500;
		text-transform: capitalize;
	}
	.gauge.good .progress {
		stroke: #1a9e4b;
	}
	.gauge.good strong {
		color: #1a9e4b;
	}
	.gauge.ok .progress {
		stroke: #e08a00;
	}
	.gauge.ok strong {
		color: #e08a00;
	}
	.gauge.bad .progress {
		stroke: #d93025;
	}
	.gauge.bad strong {
		color: #d93025;
	}

	.report h2 {
		margin: 2rem 0 1rem;
		color: #0f766e;
		font-family: 'Fraunces', Georgia, serif;
		font-weight: 500;
		font-size: 1.6rem;
		letter-spacing: 0.01em;
	}
	.all-good {
		padding: 1rem;
		background: #e7f5ec;
		border-radius: 8px;
	}
	.issues {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.issue {
		padding: 1rem 1.25rem;
		margin-bottom: 1rem;
		background: #fff;
		border: 1px solid #e8e2d9;
		border-radius: 10px;
	}
	.issue h3 {
		margin: 0.5rem 0;
		font-size: 1.1rem;
	}
	.issue p {
		margin: 0.35rem 0;
	}
	.tag {
		display: inline-block;
		padding: 0.15rem 0.6rem;
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		border-radius: 999px;
		background: #eee;
	}
	.tag.performance {
		background: #e0efff;
		color: #0b5cad;
	}
	.tag.accessibility {
		background: #f1e6ff;
		color: #6a2fb0;
	}
	.tag.seo {
		background: #e0f5ee;
		color: #0f766e;
	}
</style>
