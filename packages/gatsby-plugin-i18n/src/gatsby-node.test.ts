jest.mock('recursive-readdir', () => jest.fn())

import { createPages } from './gatsby-node';
import readdir from 'recursive-readdir';

describe('GatsbyNode', () => {
  test('createPages', async () => {
    const pagePaths = [
      '@pages/index.page.tsx',
      '@pages/story.page.tsx',
      '@pages/cs/index.module.scss',
      '@pages/cs/index.page.tsx',
      '@pages/pr/index.module.scss',
      '@pages/pr/index.page.tsx',
      '@pages/product/cookie-game.page.module.scss',
      '@pages/product/cookie-game.page.tsx',
      '@pages/product/fun-game.page.tsx',
      '@pages/product/index.page.module.scss',
      '@pages/product/index.page.tsx',
      '@pages/product/mobile-service.page.tsx',
      '@pages/product/products.ts',
      '@pages/ir/index.page.tsx',
      '@pages/ir/announcements/index.module.scss',
      '@pages/ir/announcements/index.page.tsx',
      '@pages/ir/disclosures/index.module.scss',
      '@pages/ir/disclosures/index.page.tsx',
      '@pages/ir/stock/index.module.scss',
      '@pages/ir/stock/index.page.tsx',
      '@pages/ir/references/index.module.scss',
      '@pages/ir/references/index.page.tsx',
      '@pages/story/index.module.scss',
      '@pages/story/index.page.tsx',
      '@pages/story/ci/index.module.scss',
      '@pages/story/ci/index.page.tsx',
      '@pages/story/companies/index.module.scss',
      '@pages/story/companies/index.page.tsx',
      '@pages/story/history/index.module.scss',
      '@pages/story/history/index.page.tsx',
    ];
    const expectedPages = [
      '/en/',
      '/ko/',
      '/en/story/',
      '/ko/story/',
      '/en/cs/',
      '/ko/cs/',
      '/en/pr/',
      '/ko/pr/',
      '/en/product/',
      '/ko/product/',
      '/en/product/cookie-game/',
      '/ko/product/cookie-game/',
      '/en/product/fun-game/',
      '/ko/product/fun-game/',
      '/en/product/mobile-service/',
      '/ko/product/mobile-service/',
      '/en/ir/',
      '/ko/ir/',
      '/en/ir/announcements/',
      '/ko/ir/announcements/',
      '/en/ir/disclosures/',
      '/ko/ir/disclosures/',
      '/en/ir/stock/',
      '/ko/ir/stock/',
      '/en/ir/references/',
      '/ko/ir/references/',
      '/en/story/',
      '/ko/story/',
      '/en/story/ci/',
      '/ko/story/ci/',
      '/en/story/companies/',
      '/ko/story/companies/',
      '/en/story/history/',
      '/ko/story/history/',
    ];

    const mockCreatePage = jest.fn();
    const mockGraphql = jest.fn().mockResolvedValue({
      data: {
        allLocalization: {
          nodes: [
            {
              locale: 'en',
              translations: [
                {
                  key: 'test-1',
                  value: 'test-1',
                },
                {
                  key: 'test-2',
                  value: 'test-2',
                },
              ],
            },
            {
              locale: 'ko',
              translations: [
                {
                  key: 'test-1',
                  value: 'test-1',
                },
                {
                  key: 'test-2',
                  value: 'test-2',
                },
              ],
            },
          ],
        },
      },
    });

    // @ts-ignore
    readdir.mockResolvedValueOnce(pagePaths);
    // @ts-ignore
    await createPages({ actions: { createPage: mockCreatePage }, graphql: mockGraphql }, { pagesPath: '@pages' })

    expect(mockCreatePage).toHaveBeenCalledTimes(expectedPages.length)

    const argsCalledWith = mockCreatePage.mock.calls.flat();
    expectedPages.forEach(path => {
      expect(argsCalledWith).toContainEqual(expect.objectContaining({
        path,
        component: expect.stringMatching(/^@pages/),
        context: expect.objectContaining({
          translations: {
            en: {
              'test-1': 'test-1',
              'test-2': 'test-2',
            },
            ko: {
              'test-1': 'test-1',
              'test-2': 'test-2',
            },
          },
        }),
      }))
    });
  });
});
