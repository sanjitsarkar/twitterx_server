
export default {
  development: {
    client: 'pg',
    connection: {
      host: 'xanjitxarkar-ssanjit856-c39a.e.aivencloud.com',
      user: 'avnadmin',
      port: 27955,
      password: 'AVNS_dw_Q6jrmoZ4bCQe4F_y',
      database: 'defaultdb',
      ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUfT3A9C28PaIpIlQRE1mKCyQv3SMwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZjQwODU4OTEtZTZmNC00NTgxLThhZTEtNzYwYjU4ZDIy
NGNiIFByb2plY3QgQ0EwHhcNMjQwODAxMTMxMDEyWhcNMzQwNzMwMTMxMDEyWjA6
MTgwNgYDVQQDDC9mNDA4NTg5MS1lNmY0LTQ1ODEtOGFlMS03NjBiNThkMjI0Y2Ig
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBANDuQEe7
iI65UOPZ1Z33xmEWv9vS/zORkjoJ/b/qmIbfsIA6BRZRUitygU6sYnWQW/H5CCqx
LLYyv96nR8TB5Fe/uBCnoz1jC419VjxU/CA+A3aSXhOK604cWnCin/iQkLZpg1lO
l8Ol355nfZXgjejpl5Kx5aKqKrsHSnyxfclk0XehWxBC3uYsSqqPPCcoWwK//ubi
6VwNDecvZTquvfYWJtKnuC7BQDf855QEwl+nqD8hmS0Xa2TJmP89w4w8QgC9SkuC
1+tPxvE5LZcU8YP4zg0VlW4Qasnt/D1EeCmm92Wj308jqlSan+2kGAQDeqKBMr0Q
mBQ6PALlgk0mAUKD96B8ec9LEbF1XhWmZYDQdGA1SAFeQJ9T7VtLgtQ6AtNNXQqG
gQ3wJY8p4UUtnpMyzgllTMTS4FEluMEm4rMBTtsifpnJAbGu4IUKI2R2PWd8DnYG
acpObrB5cs+SV99uxml19TsgEjQvbQ4rCrWXToqLSbAx0m7qrKnkbVHv7wIDAQAB
oz8wPTAdBgNVHQ4EFgQUNTo0lIhtHsdIA7L/Bq/Suq7RY2YwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAFfYSbPrhTdMAYqR
1NIGHHwLHuRZavl6CGkZd8GfolZQqjCkIqUuP2+BCvxqi8SlHmNZBk1nfuP0T7lv
aRM4ps9SeA9+pdhIxmEe8FNDGKJlF2e76/MJMn/bzqS7vuSHmncKebM6mkfxaUi5
tb+bm2w/ZK6yw4Bt8NEgcFL+gQBVpTByZ2+ssxL32a/uIb/1Gph9V0phu1lQp5V1
VF6I1E2TYgpf+8+AogOd8q/hw5pjDjIBOX/IwClKgKH9XKChOqI8Xf0H9Mditiz6
MhQcDuggk774rdZM3uA27CYe6U455nOkahXCQAuPf+z5jjSiA5kWLXkWfq490RoO
qPi367fDFqSNUtnM0OpcshFKItT+q4kMuyNFF0VIrLoXdx9Sy+J8TcQmUQ9kiCkS
U9hVX6wGzC+Bd15HoU2Y7YlpMGb4nqluGKUP4alJ86I8Dz/Kw9xLi+NpZ3wGRRmr
ye6Oeu/l8/kLQNCS0KFoE5pFUkuYYMONV/OFBHSO2KTZKovouQ==
-----END CERTIFICATE-----`,
      }
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
