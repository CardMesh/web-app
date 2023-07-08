<script>
  export let value;

  export let name;

  export let displayName;
</script>

<div class="form-floating mb-3">
    <textarea
            bind:value={value}
            class="form-control"
            id="{name}Textarea"
            name="{name}"
            placeholder=""
            style="height: 140px"
            type="email"></textarea>
    <label for="{name}Textarea">{displayName}</label>
    <small>The following HTML-tags are allowed: 'b', 'i', 'em', 'strong', 'a'</small>
</div>
