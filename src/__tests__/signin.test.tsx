import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Signin from "../pages/auth/Signin";
import ConfirmSignin from "../pages/auth/ConfirmSignin";
import * as authStore from "../stores/auth";
// libAuth not needed; confirmLogin is mocked on the store

describe("Signin page", () => {
  const mockInitiate = vi.fn();
  const mockConfirm = vi.fn();
  const mockSetUser = vi.fn();

  beforeEach(() => {
    vi.spyOn(authStore, "default").mockReturnValue({
      initiateLogin: mockInitiate,
      confirmLogin: mockConfirm,
      loading: false,
      error: null,
      message: null,
      setUser: mockSetUser,
    } as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends OTP and confirms login flow", async () => {
    // mock initiateLogin to resolve with a success message (matches API shape)
    mockInitiate.mockResolvedValue({
      message: "Verification code sent",
    } as any);

    // mock confirmLogin to return an object with user and message
    const fakeUser = { id: "1", email: "foo@bar.com" };
    mockConfirm.mockResolvedValueOnce({
      user: fakeUser,
      message: "Login successful",
    } as any);

    render(
      <MemoryRouter initialEntries={["/auth/signin"]}>
        <Routes>
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signin/confirm" element={<ConfirmSignin />} />
          <Route path="/dashboard" element={<div>DASHBOARD</div>} />
          <Route path="/" element={<div>HOME</div>} />
        </Routes>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const sendBtn = screen.getByRole("button", { name: /send otp/i });

    fireEvent.change(emailInput, { target: { value: "foo@bar.com" } });
    fireEvent.click(sendBtn);

    await waitFor(() =>
      expect(mockInitiate).toHaveBeenCalledWith("foo@bar.com")
    );

    // simulate showing OTP by toggling showOtp; in component this happens after initiateLogin
    // we now fill OTP and submit confirm
    const otpInput = await screen.findByPlaceholderText(
      /Enter the 6-digit code/i
    );
    const confirmBtn = screen.getByRole("button", { name: /confirm/i });

    fireEvent.change(otpInput, { target: { value: "123456" } });
    // confirmLogin mocked above to resolve to fakeUser
    fireEvent.click(confirmBtn);

    await waitFor(() =>
      expect(mockConfirm).toHaveBeenCalledWith({
        email: "foo@bar.com",
        otp: "123456",
      })
    );
    // ensure setUser was called with returned user
    await waitFor(() => expect(mockSetUser).toHaveBeenCalledWith(fakeUser));
  });
});
