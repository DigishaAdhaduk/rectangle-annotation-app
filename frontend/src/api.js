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
    headers: { "Authorization": t }
  })
  return r.json()
}

export async function saveRect(d, t) {
  const r = await fetch(url + "/annotations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": t
    },
    body: JSON.stringify(d)
  })
  return r.json()
}

export async function updRect(id, d, t) {
  await fetch(url + "/annotations/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": t
    },
    body: JSON.stringify(d)
  })
}

export async function delRect(id, t) {
  await fetch(url + "/annotations/" + id, {
    method: "DELETE",
    headers: { "Authorization": t }
  })
}
