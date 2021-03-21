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