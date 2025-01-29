const dummy = (blogs) => {
  const result = Array.isArray(blogs);
  console.log(result);
  return result ? 1 : 0;
};

const totalLikes = (blogs) => {
  const likeSum = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(likeSum, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) return null; 

 const blogIndex = blogs.reduce((max, blog, index) => {
    return blog.likes > blogs[max].likes ? index : max;
  }, 0);

  return blogs[blogIndex]
};

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null;

  // Count the number of blogs per author
  const authorBlogCount = blogs.reduce((countMap, blog) => {
    countMap[blog.author] = (countMap[blog.author] || 0) + 1;
    return countMap;
  }, {});

  // Find the author with the most blogs
  const topAuthor = Object.entries(authorBlogCount).reduce(
    (max, [author, count]) => (count > max.blogs ? { author, blogs: count } : max),
    { author: null, blogs: 0 }
  );

  return topAuthor;
};

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return null;

  // Calculate total likes per author
  const authorLikesCount = blogs.reduce((likesMap, blog) => {
    likesMap[blog.author] = (likesMap[blog.author] || 0) + blog.likes;
    return likesMap;
  }, {});

  // Find the author with the most likes
  const topAuthor = Object.entries(authorLikesCount).reduce(
    (max, [author, likes]) => (likes > max.likes ? { author, likes } : max),
    { author: null, likes: 0 }
  );

  return topAuthor;
};



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
