// posts.data.js
import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/**/*.md', {
    includeSrc: true,
})
