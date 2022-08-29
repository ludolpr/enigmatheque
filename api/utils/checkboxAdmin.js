 // isAdmin
 const isAdmin{{ user.id }} = document.getElementById('isAdmin{{ user.id }}')
 const adm{{ user.id }} = {{ isAdmin }}
 if ( adm{{ user.id }} === 1 ) isAdmin{{ user.id }}.checked = true
 // isVerified 
 const isVerified{{ user.id }} = document.getElementById('isVerified{{ user.id }}')
 const vrf{{ user.id }} = {{ isVerified }} 
 if ( vrf{{ user.id }} === 1 ) isVerified{{ user.id }}.checked = true
 // isBann
 const isBann{{ user.id }} = document.getElementById('isBann{{ user.id }}')
 const bann{{ user.id }} = {{ isBann }} 
 if ( bann{{ user.id }} === 1 ) isBann{{ user.id }}.checked = true
 
 
 console.log('ma variable modal: ', typeof adm{{ user.id }}, adm{{ user.id }})