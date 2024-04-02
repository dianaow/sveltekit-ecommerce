<script lang="ts">
  import type { PageData } from './$types'
  import Collection from '$lib/components/Collection.svelte'
  export let data: PageData
</script>

<Collection products={data.products} />
