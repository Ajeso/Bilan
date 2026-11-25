import { json } from '@sveltejs/kit';
import { advice } from '../../../lib/advice.js';
import { PAGESPEED_API_KEY } from '$app/env/private';

export async function POST({ request }) {
	const { url } = await request.json();

	if (!url || !/^https?:\/\//i.test(url)) {
		return Response.json(
			{ error: 'Please enter a full URL starting with http:// or https://' },
			{ status: 400 }
		);
	}

	if (!PAGESPEED_API_KEY) {
		console.error('PAGESPEED_API_KEY is missing from .env');
		return json({ error: 'The server is not configured yet.' }, { status: 500 });
	}

	const params = new URLSearchParams({
		url,
		strategy: 'mobile',
		key: PAGESPEED_API_KEY
	});
	['performance', 'accessibility', 'seo'].forEach((c) => params.append('category', c));

	const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`);

	if (!res.ok) {
		const details = await res.text();
		console.error('PageSpeed error:', res.status, details);
		return json(
			{ error: 'Could not audit that site. Check the URL and try again.' },
			{ status: 502 }
		);
	}

	const data = await res.json();
	const { categories, audits } = data.lighthouseResult;

	const scores = {
		performance: Math.round(categories.performance.score * 100),
		accessibility: Math.round(categories.accessibility.score * 100),
		seo: Math.round(categories.seo.score * 100)
	};

	const issues = [];
	const seen = new Set();

	for (const [category, info] of Object.entries(categories)) {
		for (const ref of info.auditRefs) {
			const a = audits[ref.id];
			if (!a || seen.has(ref.id)) continue;
			if (a.score === null || a.score >= 0.9) continue;
			if (['informative', 'notApplicable', 'manual'].includes(a.scoreDisplayMode)) continue;

			seen.add(ref.id);
			const known = advice[ref.id];
			if (!known) console.log('NO ADVICE:', ref.id, '-', a.title);
			issues.push({
				id: ref.id,
				category,
				weight: ref.weight,
				title: known?.title ?? a.title,
				why: known?.why ?? null,
				fix: known?.fix ?? null
			});
		}
	}

	issues.sort((a, b) => b.weight - a.weight);

	return json({ scores, issues: issues.slice(0, 10) });
}
