---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
---

<script setup>
import { data as posts } from '@/posts.data.js'
console.log(posts)
</script>

<h1>All Posts</h1>
<ul>
    <li v-for="post of posts">
        <a :href="post.url">{{ post.frontmatter.title }}</a>
    </li>
</ul>
