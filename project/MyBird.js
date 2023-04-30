speed = Math.PI*2/1000;
updateAnim(delta){
    angle+= speed*delta
    x = radius * Math.cos(angle)
    y = y + Math.sin(angle)
}