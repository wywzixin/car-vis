<template>
    <div id="app">
        <Car />
    </div>
</template>

<script>
import Car from './components/Car.vue';

export default {
    name: 'App',
    components: {
        Car,
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
}
</style>
