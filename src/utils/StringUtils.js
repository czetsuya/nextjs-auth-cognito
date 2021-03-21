export const replaceFirstN = (str, n) => {

  const replace = `^.{1,${n}}`
  const re = new RegExp(replace)
  return str.replace(re, m => "X".repeat(m.length))
}

export const replaceLastN = (str, n) => {

  const replace = `(.{1,${n}})$`
  const re = new RegExp(replace)
  return str.replace(re, m => Array(m.length + 1).join("X"))
}

export const replaceFirstMAndLastN = (str, m, n) => {

  let replace = `^.{1,${m}}`
  let re = new RegExp(replace)
  str = str.replace(re, m => "X".repeat(m.length))

  replace = `(.{1,${n}})$`
  re = new RegExp(replace)
  return str.replace(re, m => Array(m.length + 1).join("X"))
}