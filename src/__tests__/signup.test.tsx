import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import ConfirmSignup from "../pages/auth/ConfirmSignup";
import * as authStore from "../stores/auth";

describe("Signup page", () => {
  const mockInitiate = vi.fn();
  const mockConfirm = vi.fn();
  const mockSetUser = vi.fn();

  beforeEach(() => {
    vi.spyOn(authStore, "default").mockReturnValue({
      initiateRegistration: mockInitiate,
      confirmSignup: mockConfirm,
      loading: false,
      error: null,
      message: null,
      setUser: mockSetUser,
    } as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("registers and confirms signup flow", async () => {
  mockInitiate.mockResolvedValue({ message: "Verification code sent" } as any);
  const fakeUser = { id: "2", email: "bar@baz.com" };
  mockConfirm.mockResolvedValueOnce({ user: fakeUser, message: "Signup confirmed" } as any);

    render(
      <MemoryRouter initialEntries={["/auth/signup"]}>
        <Routes>
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/signup/confirm" element={<ConfirmSignup />} />
          <Route path="/auth/signin" element={<div>REDIRECT_SIGNIN</div>} />
          <Route path="/" element={<div>HOME</div>} />
        </Routes>
      </MemoryRouter>
    );

    // fill form
    fireEvent.change(screen.getByPlaceholderText(/First name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: "bar@baz.com" },
    });
    fireEvent.click(screen.getByRole("checkbox"));

    const createBtn = screen.getByRole("button", { name: /create account/i });
    fireEvent.click(createBtn);

    await waitFor(() => expect(mockInitiate).toHaveBeenCalled());

    // simulate OTP step
    const otpInput = await screen.findByPlaceholderText(
      /Enter the 6-digit code/i
    );
    fireEvent.change(otpInput, { target: { value: "654321" } });
    const confirmBtn = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmBtn);

    await waitFor(() =>
      expect(mockConfirm).toHaveBeenCalledWith({
        email: "bar@baz.com",
        otp: "654321",
      })
    );
    await waitFor(() => expect(mockSetUser).toHaveBeenCalledWith(fakeUser));
  });
});
