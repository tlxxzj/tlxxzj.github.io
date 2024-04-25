---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
---

<script setup>
import { data as posts } from '@/posts.data.js'
//console.log(posts)

function extractTitleFromUrl(url) {
    let title = url
    if (title.endsWith(".html")) {
        title = title.slice(0, -5)
    }
    
    return title
}
</script>

<h1>All Posts</h1>
<ul>
    <li v-for="post of posts">
        <a :href="post.url">{{ post.frontmatter.title || extractTitleFromUrl(post.url) }}</a>
    </li>
</ul>
