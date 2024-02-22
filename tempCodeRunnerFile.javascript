let sayHello = () => {console.log(3)}
const copy = sayHello
sayHello = null
copy()
