import { render, screen } from "@testing-library/react";
import NewBlog from "./NewBlog";
import userEvent from "@testing-library/user-event";
import blogService from "../services/blogs";

vi.mock("../services/blogs", () => ({
  default: {
    create: vi.fn(),
  },
}));

test("<NewBlog /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(
    <NewBlog
      setBlogs={createBlog}
      setNotification={() => {}}
      setNewBlogVisible={() => {}}
    />,
  );

  const titleInput = screen.getByRole("textbox", { name: /title/i });
  const authorInput = screen.getByRole("textbox", { name: /author/i });
  const urlInput = screen.getByRole("textbox", { name: /url/i });
  const sendButton = screen.getByText("create");

  await user.type(titleInput, "testing a form...");
  await user.type(authorInput, "testing a form...");
  await user.type(urlInput, "testing a form...");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(blogService.create).toHaveBeenCalledWith({
    title: "testing a form...",
    author: "testing a form...",
    url: "testing a form...",
  });
});
