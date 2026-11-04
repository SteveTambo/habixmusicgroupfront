import {expect, test} from '@playwright/test'

test('homepage content and wallet picker work on desktop and mobile', async ({page}) => {
  await page.route('https://www.wrhse.top/embed/**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<!doctype html><html><body>WRHSE embed preview</body></html>',
    }),
  )
  await page.goto('/')

  await expect(page).toHaveTitle('Habix Music Group | Independent Music Company in Nairobi')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /independent music and entertainment company in Nairobi/,
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://music.habixgroup.top',
  )
  const organizationData = await page.locator('script[type="application/ld+json"]').textContent()
  const structuredData = JSON.parse(organizationData ?? '{}')
  expect(structuredData['@graph']).toEqual(
    expect.arrayContaining([
      expect.objectContaining({'@type': 'Organization'}),
      expect.objectContaining({
        '@type': 'ItemList',
        itemListElement: expect.arrayContaining([
          expect.objectContaining({
            item: expect.objectContaining({
              '@type': 'MusicPlaylist',
              name: '4EVER WAVY 🌊',
              url: 'https://open.spotify.com/playlist/6t5KdJynPmNtl5w3Cjge3U',
            }),
          }),
          expect.objectContaining({
            item: expect.objectContaining({
              '@type': 'MusicPlaylist',
              name: 'DEEP IN THE TROPICS',
              url: 'https://open.spotify.com/playlist/2j02x8aOV6aB4Z1TWwrAJ6',
            }),
          }),
        ]),
      }),
    ]),
  )
  await expect(page.getByRole('heading', {name: 'Independent music, global ambition.'})).toBeVisible()
  await expect(page.getByRole('link', {name: 'Explore the group'}).locator('svg')).toBeVisible()
  await expect(page.getByRole('heading', {name: 'Multiple labels. One independent vision.'})).toBeVisible()
  await expect(page.getByRole('heading', {name: 'VIP Women’s Club'})).toBeVisible()
  await expect(page.getByRole('heading', {name: 'Playlists for the journey.'})).toBeVisible()
  await expect(page.getByRole('heading', {name: '4EVER WAVY 🌊'})).toBeVisible()
  await expect(page.getByRole('heading', {name: 'DEEP IN THE TROPICS'})).toBeVisible()
  await expect(page.getByRole('link', {name: 'Explore our labels'}).locator('svg')).toBeVisible()
  await expect(page.getByRole('heading', {name: 'Our stores.'})).toBeVisible()
  await expect(page.getByRole('link', {name: 'Stores', exact: true})).toHaveAttribute('href', '/#stores')
  await expect(page.locator('iframe[title="WRHSE store"]')).toHaveAttribute(
    'src',
    'https://www.wrhse.top/embed/store/habix-test-2',
  )
  await expect(page.locator('iframe[title="WRHSE store"]')).toHaveAttribute('height', '720')
  await expect(page.locator('iframe[title="WRHSE product"]')).toHaveAttribute(
    'src',
    'https://www.wrhse.top/embed/product/632',
  )
  await expect(page.locator('iframe[title="WRHSE product"]')).toHaveAttribute('height', '560')
  await expect(page.getByRole('img', {name: '1912 CA cover artwork'})).toBeVisible()
  await expect(page.getByRole('link', {name: 'Listen to 19.12 on Spotify'})).toHaveAttribute(
    'href',
    'https://open.spotify.com/album/1HIBBq4SInYgY2iadN7vTX',
  )
  const gagaLink = page.getByRole('link', {name: 'Listen to GAGA on Spotify'})
  await expect(gagaLink).toHaveAttribute(
    'href',
    'https://open.spotify.com/album/0qhxJzZYffPHSSzgOYth6C',
  )
  await expect(
    gagaLink.getByRole('img', {
      name: 'Black-and-white portrait of a musician wearing a VIP Women’s Club shirt',
    }),
  ).toBeVisible()
  await expect(page.getByRole('link', {name: 'Listen to Matriarch on Spotify'})).toHaveAttribute(
    'href',
    'https://open.spotify.com/album/3zYQw9LGAltIr14AL8z8cm',
  )
  await expect(page.locator('iframe[title^="Spotify playlist:"]')).toHaveCount(2)
  await expect(page.getByRole('link', {name: 'Listen to 4EVER WAVY 🌊 on Spotify'})).toHaveAttribute(
    'href',
    'https://open.spotify.com/playlist/6t5KdJynPmNtl5w3Cjge3U',
  )
  await expect(page.getByRole('link', {name: 'Listen to DEEP IN THE TROPICS on Spotify'})).toHaveAttribute(
    'href',
    'https://open.spotify.com/playlist/2j02x8aOV6aB4Z1TWwrAJ6',
  )
  await expect(
    page.getByText('featured by Habix Music Group', {exact: false}).first(),
  ).toBeVisible()

  const robots = await page.request.get('/robots.txt')
  expect(robots.ok()).toBe(true)
  expect(await robots.text()).toContain('Sitemap: https://music.habixgroup.top/sitemap.xml')

  const sitemap = await page.request.get('/sitemap.xml')
  expect(sitemap.ok()).toBe(true)
  expect(await sitemap.text()).toContain('<loc>https://music.habixgroup.top</loc>')

  await page.getByRole('button', {name: 'Connect wallet'}).click()
  const walletDialog = page.getByRole('dialog', {name: 'Connect a wallet'})
  await expect(walletDialog).toBeVisible()
  await expect(walletDialog.getByText('Phantom')).toBeVisible()
  await expect(walletDialog.getByText('Solflare')).toBeVisible()
  await expect(walletDialog.locator('img')).toHaveCount(2)
  await expect(walletDialog.locator('img').nth(0)).toHaveJSProperty('complete', true)
  await page.getByRole('button', {name: 'Close wallet dialog'}).click()
  await expect(walletDialog).not.toBeVisible()

  await page.setViewportSize({width: 390, height: 844})
  await expect(page.getByRole('button', {name: 'Connect wallet'})).toBeVisible()
  await expect(page.getByRole('heading', {name: 'Independent music, global ambition.'})).toBeVisible()
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
  ).toBe(true)
})
