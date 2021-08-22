const fs = require('fs')

const contents = () => {
    const env = fs.readFileSync('.env', { encoding: 'ASCII' })

    const envLines = env.split('\n')

    let filteredEnv = []

    // Assumption: all files have the same number of lines
    for (let index = 0; index < envLines.length; index++) {
        const envLine = envLines[index]

        if (envLine.includes('=')) {
            if (envLine.startsWith('#')) {
                filteredEnv.push(envLine.split('#')[1].trim())
            } else {
                filteredEnv.push(envLine.trim())
            }
        }
    }

    return filteredEnv
}

const generate = () => {
    const filteredEnv = contents()
    let envVariableNamesArray = []
    let envVariableValuesArray = []

    for (let i = 0; i < filteredEnv.length; i++) {
        // Assumption: the files we read are not just comments
        const envPair = filteredEnv[i].split('=')

        envVariableNamesArray.push(envPair[0])

        envVariableValuesArray.push(envPair[1])
    }

    // Assumption: for every name/key there are 3 values (env, env.staging, env.prod)
    let table = []

    for (let i = 0; i < envVariableNamesArray.length; i++) {
        table[i] = [envVariableNamesArray[i], []]

        const valueToPush = envVariableValuesArray[i]

        if (!table[i][1].includes(valueToPush)) {
            table[i][1].push(valueToPush)
        }
    }

    const stringArrayMap = table.map((nameValueArray) => {
        const name = nameValueArray[0]
        const valuesArray = nameValueArray[1]

        let string = `${name}: `

        valuesArray.forEach((value, index) => {
            if (index === 0) {
                string = string.concat(`"${value}"`)
            } else {
                string = string.concat(` | "${value}"`)
            }
        })

        return string
    })

    const string = `declare module "react-native-config" {
  interface Env {
    ${stringArrayMap.join('\n    ')}
  }

  const Config: Env

  export default Config
}`

    fs.writeFileSync('typings/env.d.ts', string, 'utf8')
}

generate()
