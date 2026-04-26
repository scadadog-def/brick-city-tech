export function loadMembers() {
  try {
    const raw = localStorage.getItem('bct_members_v1')
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function saveMembers(members) {
  try {
    localStorage.setItem('bct_members_v1', JSON.stringify(members))
  } catch {}
}

export function downloadText(filename, text, mime = 'text/plain') {
  const blob = new Blob([text], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function exportMembersCSV(members) {
  const header = ['createdAt', 'name', 'email', 'role', 'interest', 'notes']
  const rows = members.map((m) =>
    header
      .map((k) => {
        const v = (m[k] ?? '').toString().replaceAll('"', '""')
        return `"${v}"`
      })
      .join(','),
  )
  const csv = [header.join(','), ...rows].join('\n') + '\n'
  downloadText('brick_city_tech_members.csv', csv, 'text/csv')
}

export function exportMembersJSON(members) {
  downloadText('brick_city_tech_members.json', JSON.stringify(members, null, 2) + '\n', 'application/json')
}
