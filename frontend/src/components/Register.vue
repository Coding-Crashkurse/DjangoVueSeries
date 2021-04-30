<template>
<div>
    <div id=loginwrapper>
        <h1>Register</h1>
        <form class="form">
            <input type="text" placeholder="Username">
            <input type="password" placeholder="Passwort">
            <input type="password" placeholder="Passwort wiederholen">
            <input type="email" placeholder="Email">
            <input type="text" placeholder="Vorname">
            <input type="text" placeholder="Nachname">
            <button type="submit">Registrierung</button>
        </form>
    </div>
</div>

</template>

<script>

</script>

<style scoped>
#loginwrapper {
    padding: 30px 30px;
    width: 500px;
    position: absolute;
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translate(-50%, 0);
    background: white;
    border: 1px solid black;
    text-align: center;
}

input {
    display: block;
    padding: 15px;
    width: 100%;
    background: #f2f2f2;
    margin: 5px 0px;
}

button {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  background: black;
  color: white;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}
</style>
