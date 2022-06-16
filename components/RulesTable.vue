<template>
    <div class="table-responsive">
        <table class="table table-borderless">
        <thead>
            <tr>
                <th>Type</th>
                <th>Rules</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="group in groupedRulesByType" :key="group.id">
                <td>{{ group.name }}</td>
                <td>
                    <ul class="rule-items">
                        <li  v-for="(rule,index) in group.rules" :key="index">
                           <div class="rule">
                                <button @click="$nuxt.$emit('rule-delete', rule)">
                                    {{ rule.name }}
                                     <img src="~/images/icon-close.svg" alt="">
                                </button>
                           </div>
                        </li>
                    </ul>
                </td>
                <td>
                    <button class="btn btn-danger" @click="$nuxt.$emit('rule-delete', group)">Delete</button>
                </td>
            </tr>
        </tbody>
        </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex' 
export default {
    name: "UserTable",
    computed: {
        ...mapGetters(['groupedRulesByType']),
    },
}
</script>

<style>

</style>