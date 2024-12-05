<a id="top"></a>

<!-- Project Overview -->
<h1>PI Link</h1>
<p>A companion app for the deduction and bluffing game, <em>Detective Club</em>.</p>

<div align="center">
	<a href="https://pi-link-web-production.up.railway.app/">View Live</a>
	&nbsp;&nbsp;|&nbsp;&nbsp;
	<a href="https://github.com/mngatewood/pi-link-web/issues/new?labels=bug">Report a Bug</a>
	&nbsp;&nbsp;|&nbsp;&nbsp;
	<a href="https://github.com/mngatewood/pi-link-web/issues/new?labels=enhancement">Request a Feature</a>
</div>
<br>

<!-- Table of Contents -->
<details>
	<summary>Table of Contents</summary>
	<ol>
		<li><a href="#about">About the Project</a></li>
		<li><a href="#getting-started">Getting Started</a></li>
		<li><a href="#license">License</a></li>
		<li><a href="#contact">Contact</a></li>
	</ol>
</details>

<!-- About -->
<h2 id="about">About the Project</h2>

<img src="https://raw.githubusercontent.com/mngatewood/keys-cogs/refs/heads/main/public/screenshot-keys-cogs-hires.png" alt="project screenshot">
<br>

<p>PI Link is a digital reimplementation of the board game Detective Club published in 2018. In each round, one of the players — the Informant — secretly teams up with another — the Conspirator — and tries to make them guess a secret word using two illustrated cards. Other players are Detectives, who also know the word, but don’t know the identities of each other. Detectives have to find out who the Conspirator is, making sure they don’t get accused by their fellow players!

</p>

<h3 id="powered-by">Powered By</h3>

<div align="center">
	<img src="https://img.shields.io/badge/Svelte-black?logo=svelte" />
	&nbsp;&nbsp;&nbsp;&nbsp;
	<img src="https://img.shields.io/badge/PocketBase-black?logo=pocketbase" />
	&nbsp;&nbsp;&nbsp;&nbsp;
	<img src="https://img.shields.io/badge/TailwindCSS-black?logo=tailwindcss" />
</div>
<br>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Getting Started -->
<h2 id="getting-started">Getting Started</h2>
<ol>
	<li>
		<p>
			<a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository">Clone this repository.</a>
		</p>
		<pre><code>git clone https://github.com/mngatewood/pi-link-web.git</code></pre>
	</li>
	<li>
		<p>Install dependencies.</p>
		<pre><code>npm install</code></pre>
	</li>
	<li>
		<p>Run the development server</p>
		<pre><code>npm run dev</code></pre>
	</li>
	<li>
		<p>Open <a href="http://localhost:5173">http://localhost:5173</a> with your browser to see the result.</p>
	</li>
</ol>

<p>Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).</p>

<p align="right">(<a href="#top">back to top</a>)</p>

<h2 id="license">License</h2>

<p>Distributed under the MIT License. See <a href="https://github.com/mngatewood/pi-link-web/blob/main/LICENSE.txt"><code>LICENSE.txt</code></a> for more information.</p>

<p align="right">(<a href="#top">back to top</a>)</p>

<h2 id="contact">Contact</h2>

<div align="center">
	<a href="https://www.mngatewood.com">Website</a>
	&nbsp;&nbsp;|&nbsp;&nbsp;
	<a href="mailto:michael@mngatewood.com">Email</a>
	&nbsp;&nbsp;|&nbsp;&nbsp;
	<a href="https://www.linkedin.com/in/mngatewood/">LinkedIn</a>
	&nbsp;&nbsp;|&nbsp;&nbsp;
	<a href="https://github.com/mngatewood">GitHub</a>
</div>
<br>

<p align="right">(<a href="#top">back to top</a>)</p>












# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
