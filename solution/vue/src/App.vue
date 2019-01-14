<template>
<div id="app">
	<Header/>
	<Form/>
	<Graph/>
	<Table/>
</div>
</template>

<script>

import Header from './components/Header';
import Form from './components/Form';
import Graph from './components/Graph';
import Table from './components/Table';

export default {
	name: 'App',
	components: {Header, Form, Graph, Table}
};
</script>

<style>
html, body {
	height: 100%;
}
* {
	margin: 0;
	padding: 0;
}
#app {
	height: 100%;
	display:grid;
	grid-template-rows: auto auto .5fr .5fr;
}
</style>