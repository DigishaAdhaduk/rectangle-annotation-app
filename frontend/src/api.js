const url = "http://localhost:4000"

export async function login(d) {
  const r = await fetch(url + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(d)
  })
  return r.json()
}

export async function getRects(t) {
  const r = await fetch(url + "/annotations", {
    headers: { authorization: t }
  })
  return r.json()
}

export async function saveRect(d, t) {
  const r = await fetch(url + "/annotations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: t
    },
    body: JSON.stringify(d)
  })
  return r.json()
}

export async function delRect(id, t) {
  await fetch(url + "/annotations/" + id, {
    method: "DELETE",
    headers: { authorization: t }
  })
}
