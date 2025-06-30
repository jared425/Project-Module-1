<template>
  <div class="card">
    <div class="icon">{{ icon }}</div>
    <p class="label">{{ label }}</p>
    <h2 class="value">{{ value }}</h2>
  </div>
</template>
<script setup>
defineProps({
  icon: String,
  label: String,
  value: [String, Number]
})
</script>
<style scoped>
.card {
  background-color: #1C5596;
  padding: 1rem;
  flex: 1;
  min-width: 180px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 5px rgb(241, 236, 236);
}
.icon {
  font-size: 1.8rem;
  margin-bottom: 0.4rem;
  color: #C6CBD8;
}
.label {
  font-size: 0.9rem;
  color: #ECE8E8;
  margin: 0.3rem 0;
}
.value {
  font-size: 1.5rem;
  margin: 0;
  color: #F3EBEB;
}
</style>