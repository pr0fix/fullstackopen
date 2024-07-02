import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, vi } from "vitest";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

describe("<Blog />", () => {
  const testUser = {
    username: "testUser",
    name: "testUser",
  };

  const blog = {
    title: "very important test blog",
    author: "test author III",
    url: "testurl.com",
    likes: 56,
    user: testUser,
  };

  const updateBlog = vi.fn();
  const deleteBlog = vi.fn();

  test("renders blog title and author but not url or likes by default", () => {
    render(
      <Blog
        blog={blog}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
        user={testUser}
      />
    );

    const title = screen.getByText(/very important test blog/i);
    const author = screen.getByText(/test author III/i);
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();

    const url = screen.queryByText(/testurl.com/i);
    const likes = screen.queryByText(/likes/i);
    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  test("renders all information about a blog when 'view'-button is pressed", async () => {
    render(
      <Blog
        blog={blog}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
        user={testUser}
      />
    );

    const title = screen.getByText(/very important test blog/i);
    const author = screen.getByText(/test author III/i);
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();

    const user = userEvent.setup();
    const viewButton = screen.getByText(/view/i);
    await user.click(viewButton);

    const url = screen.queryByText(/testurl.com/i);
    const likes = screen.queryByText(/likes/i);
    const blogCreator = screen.getByText(/testUser/i);
    expect(url).toBeInTheDocument();
    expect(likes).toBeInTheDocument();
    expect(blogCreator).toBeInTheDocument();
  });

  test("props handler is called twice when like button is pressed twice", async () => {
    render(
      <Blog
        blog={blog}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
        user={testUser}
      />
    );
    const title = screen.getByText(/very important test blog/i);
    const author = screen.getByText(/test author III/i);
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();

    const user = userEvent.setup();
    const viewButton = screen.getByText(/view/i);
    await user.click(viewButton);

    const likeButton = screen.getByRole("button", { name: /like/i });
    await user.click(likeButton);
    await user.click(likeButton);
    expect(updateBlog.mock.calls).toHaveLength(2)
    // expect(updateBlog).toHaveBeenCalledTimes(2);
  });
});
