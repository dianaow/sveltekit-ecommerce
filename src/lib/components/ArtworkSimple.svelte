<script>
  export let artwork;
  export let width = '300px';
</script>

<div class="artwork" style="{`max-width: ${width};`}">
  <img src={artwork.url} alt={artwork.public_id} />
  {#if artwork.category}
    <div class="artwork-info">
      <div>{artwork.category}</div>
    </div>
  {/if}  
</div>

<style>
  .artwork {
    padding: 10px;
    width: 100%;
    height: auto;
    max-width: 300px;
  }

  .artwork img {
    width: 100%;
    height: auto;
    pointer-events: none;
  }

  .artwork-info {
    margin-top: -20px;
    background-color: black;
    opacity: 0.6;
    color: white;
  }
</style>