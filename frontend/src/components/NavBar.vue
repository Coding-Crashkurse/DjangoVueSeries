<template>
<nav id="nav">
    <h1>ToDoApp</h1>
    <ul id="navbar">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
    </ul>
</nav>
</template>

<script>

</script>

<style scoped>

#nav {
    display: flex;
    justify-content: space-between;
    background: lightgray;
    align-items: center;
    font-size: 20px;
    text-transform: uppercase;
    padding: 10px 5px;
}

#navbar {
    display: flex;
    list-style: none;
    
}

#navbar li a {
    padding: 10px 10px;
    text-decoration: none;
    color: black;
}

</style>
