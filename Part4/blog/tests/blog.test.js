const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('blog', () => {
  const listBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0,
    },
    {
      _id: '5a422aa71b54f4h56h17f8',
      title: 'Go To The Ants',
      author: 'Robert Clark',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 17,
      __v: 0,
    },
  ];
  
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listBlog)
      assert.strictEqual(result, 32)
    })
 
    test ('favoriteBlog', () => {
      const result = {
        _id: '5a422aa71b54f4h56h17f8',
        title: 'Go To The Ants',
        author: 'Robert Clark',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 17,
        __v: 0,
      }

      const favorite = listHelper.favoriteBlog(listBlog)

      assert.deepStrictEqual(favorite, result)
    })

    test ('mostBlog', () => {
      const result =   {
        author: 'Edsger W. Dijkstra',
        blogs: 2
      }

      const mostBlog = listHelper.mostBlogs(listBlog)

      assert.deepStrictEqual(mostBlog, result)
  
    })

    test('mostLikes', () => {
      const result = {
        author: 'Robert Clark',
        likes: 17,
      };
    
      const mostLikes = listHelper.mostLikes(listBlog);
    
      assert.deepStrictEqual(mostLikes, result);
    });
    
  })

