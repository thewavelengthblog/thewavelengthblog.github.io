# Your blog

A movies and culture blog. Free to host on GitHub Pages, with a private editor at `/admin`.

## Put it online (one time, about 20 minutes)

1. **Create a GitHub account** at github.com if you don't have one.
2. **Create a repository** named `YOUR_USERNAME.github.io` (use your real username). Make it Public.
3. **Upload these files** to it: on the repository page choose "uploading an existing file", drag in everything from this folder (including the hidden `.github` folder), and commit.
4. **Turn on Pages**: Settings → Pages → Source → "GitHub Actions". The site builds itself and appears at `https://YOUR_USERNAME.github.io` in a couple of minutes.
5. **Set the blog's name**: open `src/site.config.mjs`, click the pencil icon, change the blog name and your name, and commit. The site address and the editor's settings fill themselves in.

The repository must be named `YOUR_USERNAME.github.io`. With any other name the build stops with a message telling you to rename it, unless you have connected your own domain.

## Write a post

1. Go to `https://YOUR_SITE/admin/`.
2. Choose **Sign In Using Access Token** (the "Sign In with GitHub" button on that screen does not work for this setup). The first time, GitHub asks you to create an access token: limit it to this one repository, with "Contents: Read and write". Paste it in. The token stays in your browser, and only someone with it can publish, so keep it private.
3. Click **Posts → New**, fill in the headline, section, rating and review, and press **Publish**. The live site updates in a minute or two.

Leave the rating and film fields empty for essays. Tick "Draft" to save a post without showing it. Tick "Feature at the top of the homepage" to pin one post as the big headline; otherwise the newest post is featured.

Delete the two sample posts from the editor once you have written your own.

## Use your own domain

1. Buy the domain from any registrar.
2. In the repository: Settings → Pages → Custom domain, enter the domain and save. GitHub shows the DNS records to add at your registrar.
3. Change `url` in `src/site.config.mjs` to the new address.

## Email subscribe

Until you set it up, the site offers the RSS feed only. To add an email box, create a free account with a newsletter service such as Buttondown and paste its form address into `subscribeFormAction` in `src/site.config.mjs`.

## Images

Upload cover images through the editor. Use your own photos, official press stills, or images you have permission to publish.

Images are published at the size you upload them, so resize large photos first (about 2000 pixels wide is plenty). Wide images are cropped to fill their frame; posters and other tall images are shown whole.

## Run it on your own computer (optional)

With Node.js 22 installed: `npm install`, then `npm run dev`.
