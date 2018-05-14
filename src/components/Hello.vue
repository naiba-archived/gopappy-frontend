<template>
    <div class="container">
        <button class="button is-primary"> Hello {{msg}} !</button>
    </div>
</template>


<script>
    export default {
        name: 'hello',
        data: function () {
            return {
                msg: "Naiba"
            }
        },
        methods: {},
        components: {}
    }
</script>

<style scoped>
</style>
