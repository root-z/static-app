const State = {
  EMPTY: "EMPTY",
  HEALTHY: "HEALTHY",
  SICK: "SICK"
}

function buildEmpty() {
  return {
    state: State.EMPTY
  }
}

function buildHealthy(immuneUntilTime) {
  return {
    state: State.HEALTHY,
    immuneUntil: immuneUntilTime
  }
}

function buildSick(sickUntilTime) {
  return {
    state: State.SICK,
    sickUntil: sickUntilTime
  }
}

function initialize(length = 100, pop_density = 0.5, recoveryTime = 14) {
  let totalHealthy = 0
  const land = Array(length).fill(null).map(
    () => Array(length).fill(null).map(
      () => {
        if (Math.random() < pop_density) {
          totalHealthy++
          return buildHealthy(0)
        } else {
          return buildEmpty()
        }
      }))
  
  let count = 0
outerloop:
  for (let i = 0; i < land.length; i++) {
    for (let j = 0; j < land[i].length; j++) {
      if (land[i][j].state === State.HEALTHY) {
        if (count > totalHealthy / 2) {
          land[i][j] = buildSick(recoveryTime)
          break outerloop
        } else {
          count++
        }
      }
    }
  }
  
  return land
}

function transition(currState, currTime, pInfection = 0.5, recoveryTime = 14, immuneTime = 7) {
  console.log(immuneTime)
  const nextState = Array(currState.length).fill(null).map(() => Array(currState[0].length).fill(null))
  for (let i = 0; i < currState.length; i++) {
    for (let j = 0; j < currState[i].length; j++) {
      if (currState[i][j].state === State.HEALTHY // is healthy
        && currState[i][j].immuneUntil < currTime) { // not immune
        const sickCount = countSick(currState, i, j)
        const pSick = 1 - (1 - pInfection) ** sickCount
        if (Math.random() < pSick) {
          nextState[i][j] = buildSick(currTime + recoveryTime)
        } else {
          nextState[i][j] = currState[i][j]
        }
      } else if (currState[i][j].state === State.SICK && currTime > currState[i][j].sickUntil) {
        nextState[i][j] = buildHealthy(currTime + immuneTime) 
      } else {
        nextState[i][j] = currState[i][j]
      }
    }
  }
  return nextState
}

function countSick(currState, x, y) {
  let count = 0
  for (let i = x - 1; i < x + 2; i++) {
    for (let j = y - 1; j < y + 2; j++) {
      if (i > -1 && i < currState.length && j > -1 && j < currState.length) {
        if (currState[i][j].state === State.SICK) {
          count++
        }
      }
    }
  }
  return count
}


export {initialize, transition, State}