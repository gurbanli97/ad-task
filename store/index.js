import { transformType } from '~/helpers/types'

export const state = () => ({
    targetingTypes: [],
    categoryTypes: [],
    countryTypes: [],
    deviceTypes: [],
    savedRules: [],
})

export const getters = {
    targetingTypes: s => s.targetingTypes.map(transformType),
    categoryTypes: s => s.categoryTypes.map(transformType),
    countryTypes: s => s.countryTypes.map(transformType),
    deviceTypes: s => s.deviceTypes.map(transformType),
    groupedRulesByType: s => s.savedRules.reduce((groups, rule) => {
        const key = rule.targeting_type_id;
        if (!groups[key]) {
            groups[key] = {
                id: key,
                rules: [],
                name: s.targetingTypes.find(t => t.id === key).name
            }
        }
        const allTypes = [
            ...s.categoryTypes,
            ...s.countryTypes,
            ...s.deviceTypes
        ]
        groups[key].rules.push({
            ...rule,
            name: allTypes.find(t => t.id == rule.rule)?.name || rule.rule
        });
        return groups;
     }, {})
}

export const mutations = {
    SET_TYPES(state, { key, types }){
        state[key] = types
    },
    SET_SAVED_RULES(state, { rules }){
        state.savedRules = rules
    },
    ADD_RULES(state, { rules }){
        state.savedRules = state.savedRules.concat(rules)
    }
}
  
export const actions = {
    async fetchTargetingTypes({commit}){
        const { data: types } = await this.$axios.get('/types')
        commit('SET_TYPES', { types, key: 'targetingTypes' })
    },
    async fetchCategoryTypes({commit,state}){
        if(state.categoryTypes?.length) return
        const { data: types } = await this.$axios.get('/categories')
        commit('SET_TYPES', { types, key: 'categoryTypes' })
    },
    async fetchCountryTypes({commit,state}){
        if(state.countryTypes?.length) return
        const { data: types } = await this.$axios.get('/countries')
        commit('SET_TYPES', { types, key: 'countryTypes' })
    },
    async fetchDeviceTypes({commit,state}){
        if(state.deviceTypes?.length) return
        const { data: types }  = await this.$axios.get('/devices')
        commit('SET_TYPES', { types, key: 'deviceTypes' })
    },
    async fetchSavedTargetingRules({commit}){
        const { data: rules } = await this.$axios.get('/rules')
        commit('SET_SAVED_RULES', { rules })
    },
    async addRule({commit}, newRules){
        const { data: { rules } } = await this.$axios.post('/rules', newRules)
        commit('ADD_RULES', { rules })
    },

    async deleteRule(_,item){
        let payload = {}
        if(item.rules?.length){
           payload = {
                targeting_type_id: item.rules[0].targeting_type_id,
                rules: item.rules.map(item => item.rule)
            }
        } else {
             payload = {
                targeting_type_id: item.targeting_type_id,
                rules: [item.rule]
            }
        }
       await this.$axios.request('/rules', {
        data: payload,
        method: 'delete'
    })
   }
}