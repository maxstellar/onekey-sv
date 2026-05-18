<!--
  <Keycap> - chunky 3D keyboard-keycap button.

  Usage (standalone):

    <script>
      import Keycap from '$lib/components/Keycap.svelte';
    </script>

    <Keycap pressed={isActive} color="var(--accent)" size={48}>
      <img src="/icons/key.svg" alt="" />
    </Keycap>

  Props:
    size    - outer square in px (default 62)
    pressed - "pushed down" visual state
    color   - top face color (any CSS color or var)
    border  - outer edge color
    children slot renders centered on the key face
-->

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		size?: number | string;
		pressed?: boolean;
		color?: string;
		border?: string;
		children?: Snippet;
	};

	let {
		size = 62,
		pressed = false,
		color = 'var(--keycap-color, white)',
		border = 'var(--keycap-border, #0e0f12)',
		children
	}: Props = $props();

	const sizeCss = $derived(typeof size === 'number' ? `${size}px` : size);
</script>

<div
	class="keycap"
	class:pressed
	style="--size: {sizeCss}; --color: {color}; --border: {border};"
>
	<div class="face">
		{@render children?.()}
	</div>
</div>

<style>
	.keycap {
		position: relative;
		width: var(--size);
		height: var(--size);
		box-sizing: border-box;
		padding: calc(var(--size) * 0.065);
		border-radius: calc(var(--size) * 0.145);
		border: 1.5px solid var(--border);
		background: linear-gradient(
			to bottom,
			color-mix(in srgb, var(--color) 92%, white) 0%,
			var(--color) 70%,
			color-mix(in srgb, var(--color) 85%, black) 100%
		);
		box-shadow:
			0 calc(var(--size) * 0.12) 0 var(--border),
			0 calc(var(--size) * 0.16) calc(var(--size) * 0.2) rgba(0, 0, 0, 0.35);
		transition:
			transform 160ms ease-in,
			box-shadow 160ms ease-in;
		will-change: transform;
	}

	.face {
		width: 100%;
		height: 100%;
		border-radius: calc(var(--size) * 0.1);
		border: 1px solid color-mix(in srgb, var(--border) 25%, transparent);
		background: var(--color);
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

.keycap:not(.pressed):active,
	.keycap.pressed {
		transform: translateY(calc(var(--size) * 0.12));
		box-shadow:
			0 0 0 var(--border),
			0 calc(var(--size) * 0.03) calc(var(--size) * 0.08) rgba(0, 0, 0, 0.22);
	}
</style>
