import { faker } from '@faker-js/faker';

export const generateNewsArticles = (count = 10) => {
  const articles = [];
  for (let i = 0; i < count; i++) {
    articles.push({
      // These keys should match what your actual API returns for news articles
      source: {
        id: faker.string.uuid(),
        name: faker.company.name(),
      },
      author: faker.person.fullName(),
      title: faker.lorem.sentence(8),
      description: faker.lorem.paragraph(3),
      url: faker.internet.url(),
      urlToImage: faker.image.urlLoremFlickr({ category: 'news', width: 640, height: 480 }),
      publishedAt: faker.date.recent().toISOString(),
      content: faker.lorem.paragraphs(5),
    });
  }
  return articles;
};