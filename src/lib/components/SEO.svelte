<script lang="ts">
   import { PUBLIC_SITE_NAME, PUBLIC_SITE_DESCRIPTION } from '$env/static/public'
   import { MetaTags } from 'svelte-meta-tags'
   import { page } from '$app/stores'

   export let title = ''
   export let description = PUBLIC_SITE_DESCRIPTION
   export let og = true

   let titleTemplate = `%s | ${PUBLIC_SITE_NAME}`

   if (!title) {
      title = PUBLIC_SITE_NAME
      titleTemplate = '%s'
   }

   const ogData = og? {
      url: $page.url.href,
      title: title,
      description: description,
      siteName: PUBLIC_SITE_NAME
   } : undefined
</script>

<MetaTags
   title={title}
   titleTemplate={titleTemplate}
   description={description} 
   canonical={$page.url.origin + $page.url.pathname}
   openGraph={ogData}
/>