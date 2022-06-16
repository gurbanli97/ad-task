<template>
  <div class="add-rule row">
      <div class="add-rule_type col-4">
        <client-only>
         <treeselect 
            :clearable="true"
            :searchable="true"
            :limit=0
            :close-on-select="true"
            :limit-text = "count => `${count} items`"
            :options="targetingTypes" 
            placeholder="Select type"
            v-model="selectedType"
            />
        </client-only>
      </div>
         <div class="add-rule_rules col-8">
        <b-form-group v-if="selectedType == 4" >
            <b-form-input
                autocomplete="off"
                v-model="selectedCustomRules"
            />
        </b-form-group>
        <client-only v-else>
         <treeselect 
            multiple
            :clearable="true"
            :searchable="true"
            :close-on-select="true"
            :options="filteredRuleOptions" 
            placeholder="Select rules"
            v-model="selectedRules"
            />
        </client-only>
       
      </div>
      <div class="add-rule_actions col-4 ml-auto mt-4">
          <button class="btn btn-warning" @click="resetOptions">Reset</button>
          <button class="btn btn-success" @click="handleRuleSave">Add rule</button>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'AddRule',
    data(){
        return {
            selectedType: null,
            selectedCustomRules: null,
            selectedRules: [],
        }
    },
    computed: {
        ...mapGetters([
            'targetingTypes',
            'categoryTypes',
            'countryTypes',
            'deviceTypes',
            'groupedRulesByType'
        ]),
        ruleOptions(){
            switch(this.selectedType){
                case 1:
                    return this.categoryTypes
                case 2:
                    return this.countryTypes
                case 3:
                    return this.deviceTypes
                default:
                    return []
            }
        },
        filteredRuleOptions () {
            return this.ruleOptions
                .filter(o => !this.groupedRulesByType[this.selectedType].rules.find(rule => rule.rule == o.id))
        }
    },
    methods: {
        resetOptions(){
            this.selectedType = null
            this.selectedRules = []
            this.selectedCustomRules = null
        },
        handleRuleSave(){
            if (!this.selectedType || (!this.selectedRules?.length && !this.selectedCustomRules)) return 
            let saved = {
                targeting_type_id: this.selectedType,
                rules:  this.selectedType == 4
                    ? this.selectedCustomRules.split(',')
                    : this.selectedRules
            }
            this.$emit('rule-save', saved)
            this.resetOptions()
        },
      
    },
}
</script>

<style>

</style>