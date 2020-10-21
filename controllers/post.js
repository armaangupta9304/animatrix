exports.postNew = (req, res, next) => {
    const username = req.session.user.username;
    const legacy = req.session.user.legacy;
    const model = {
      title: req.body.title,
      content: req.body.content,
      author: username,
      legacy: legacy,
      user: req.session.user
    }
    const post = new Post.postModel(model);
    post.save(function (err, doc) {
      if (err) {
        console.log(
          `[ERROR]: An Error Occured while saving the post.`.red.underline
        );
        res.status(400).json({
          error: [
            {
              code: 3,
              _error: "An Error Occured While Saving Your Post!",
            },
          ],
        });
        console.log(err);
      } else {
        res.json(doc);
      }
    });
  }

exports.getById = async (req, res, next) => {
    try {
      const found = Post.postModel.findById(req.params._id);
      res.json({
        post: found,
      });
    } catch (error) {
      console.log(
        `[ERROR]: An Error Occured While Fetching The Post With An _id of '${req.params._id}'`
          .red.underline
      );
      res.status(400).json({
        error: [
          {
            code: 2,
            _error: "An Error Occured While Fetching The Post.",
          },
        ],
      });
    }
  }

exports.getPosts = async (req, res, next) => {
    try {
      const found = await Post.postModel.find();
      res.json({
        posts: found,
      });
    } catch (err) {
      console.log(`[ERROR]: An Error Occured While Fetching Posts`.red.underline);
      res.status(400).json({
        error: [
          {
            code: 1,
            _error: "An Error Occured While Fetching Posts",
          },
        ],
      });
    }
  }