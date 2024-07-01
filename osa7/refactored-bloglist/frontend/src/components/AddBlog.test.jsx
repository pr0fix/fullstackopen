import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import AddBlog from "./AddBlog";

describe("<AddBlog />", () => {
  test("calls createBlog callback function with correct data when a new blog is added", async () => {
    const user = userEvent.setup();
    const createBlog = vi.fn();

    render(<AddBlog createBlog={createBlog} />);

    const titleInput = screen.getByLabelText("title:");
    const authorInput = screen.getByLabelText("author:");
    const urlInput = screen.getByLabelText("url:");
    const addButton = screen.getByRole("button", { name: /create/i });

    await user.type(titleInput, "testtitle");
    await user.type(authorInput, "testauthor");
    await user.type(urlInput, "testurl");
    await user.click(addButton);

    expect(createBlog).toHaveBeenCalledWith({
      title: "testtitle",
      author: "testauthor",
      url: "testurl",
    });
  });
});
