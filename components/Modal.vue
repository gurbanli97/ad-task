<template>
  <div class="modal-overlay" @click.self="handleBackdropClick" v-if="toggle">
      <div class="modal-content">
          <div class="modal-info">
              <img src="~/images/warning.svg" alt="">
              <h2>Are you sure you want to delete this rule?</h2>
          </div>
          <div class="modal-actions">
              <button class="btn" @click="$nuxt.$emit('modal-delete-click', item)">Yes, delete</button>
              <button class="btn" @click.stop="handleBackdropClick" >Go back</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        toggle: Boolean,
        item: {
            type: Object,
        }
    },
    methods: {
    handleEscapeKey(e) {
      if (this.toggle && e.key === 'Escape'){
        this.$emit('close');
      }
    },
    handleBackdropClick() {
        this.$emit('close');
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleEscapeKey);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleEscapeKey);
  }
}
</script>

<style>

</style>