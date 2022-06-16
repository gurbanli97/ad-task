<template>
  <div class="main">
    <div class="container">
      <div class="main-inner">
        <h1>Ad Targeting</h1>
        <add-rule
          @rule-save="handleRuleSave"
        />
        <rules-table />
        <modal 
          :toggle="showDeleteModal"
          @close="showDeleteModal = false"
          :item="itemToDelete"
        />

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddRule from '../components/AddRule.vue'
import RulesTable from '../components/RulesTable.vue'
import Modal from '../components/Modal.vue'
export default {
  components: { AddRule, RulesTable,Modal },
  name: 'IndexPage',
  data(){
    return {
      showDeleteModal: false,
      itemToDelete: null
    }
  },
  methods: {
    handleRuleSave(item){
      this.$store.dispatch('addRule', item)
    },
    openModal(item){
          this.showDeleteModal = true,
          this.itemToDelete = item
    },
    async handleRuleDelete(item){
      this.showDeleteModal = false
      await this.$store.dispatch('deleteRule',item)
    },
  },
  created() {
    this.$nuxt.$on('rule-delete', this.openModal);
    this.$nuxt.$on('modal-delete-click', this.handleRuleDelete);
  },
  beforeDestroy() {
    this.$nuxt.$off('modal-delete-click', this.handleRuleDelete);
  },
  async asyncData({store}) {
    await Promise.all([
      store.dispatch("fetchTargetingTypes"),
      store.dispatch("fetchSavedTargetingRules"),
      store.dispatch("fetchCategoryTypes"),
      store.dispatch("fetchCountryTypes"),
      store.dispatch("fetchDeviceTypes"),
    ])
  },
}
</script>
