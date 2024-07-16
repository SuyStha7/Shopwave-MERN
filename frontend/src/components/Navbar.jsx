import {
  CircleUserRound,
  Menu,
  Package2,
  Search,
  ShoppingCart,
} from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "@/store/features/auth/authSlice";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { clearCart } from "@/store/features/cart/cartSlice";

const Navbar = () => {
  const navItems = ["Home", "Shop", "Blog", "Contact"];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user?.user);
  const cartItems = useSelector((state) => state.cart.items);

  const location = useLocation();
  const URLSearch = new URLSearchParams(location.search);
  const initialSearchQuery = URLSearch.get("q") || "";
  const [search, setSearch] = useState(initialSearchQuery);

  useEffect(() => {
    setSearch(initialSearchQuery);
  }, [initialSearchQuery]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logout())
      .unwrap()
      .then((res) => {
        if (res?.success === true) {
          toast.success(res?.message, { autoClose: 1000 });
          navigate("/");
        } else {
          toast.error(res?.message, { autoClose: 1000 });
        }
      })
      .catch((err) => {
        toast.error(err.message, { autoClose: 1000 });
      });
  };

  return (
    <header className='sticky top-0 flex h-20 items-center gap-4 border-b bg-background px-5 md:px-6 z-50'>
      {/* Mobile menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link
              to='/'
              className='flex items-center gap-2 text-lg font-semibold'>
              <Package2 className='h-6 w-6' />
              <span className='font-bold uppercase hover:text-blue-400'>
                Shopwave
              </span>
            </Link>
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className='text-muted-foreground transition-colors hover:text-foreground'>
                {item}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Tablet and desktop menu */}
      <nav className='hidden md:flex flex-col md:flex-row gap-6 text-lg font-medium md:items-center md:gap-5 md:text-sm lg:gap-6 z-50'>
        <div>
          <Link
            to='/'
            className='flex items-center gap-2 text-lg font-semibold md:text-xl'>
            <Package2 className='h-6 w-6' />
            <span className='font-bold uppercase hover:text-blue-400 md:hidden lg:block'>
              Shopwave
            </span>
          </Link>
        </div>
        <ul className='flex gap-6 uppercase md:ml-10 lg:ml-72'>
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 text-[16px] font-bold"
                  : "text-muted-foreground transition-colors hover:text-blue-500 text-[16px] font-bold"
              }>
              {item}
            </NavLink>
          ))}
        </ul>
      </nav>

      <div className='flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <div className='flex-grow md:flex-grow-0 w-72 md:ml-20 lg:ml-36'>
          <div className='relative flex items-center'>
            <Input
              type='text'
              placeholder='Search...'
              onChange={handleSearch}
              value={search}
              className='md:w-72 lg:w-full px-3 py-2 border border-gray-600 focus:outline-none focus:border-blue-600'
            />
            <button
              type='submit'
              className='absolute right-0 top-0 lg:right-0 md:right-1 h-full px-3 text-gray-600 rounded-r-md flex items-center justify-center focus:outline-none'>
              <Search className='h-6 w-6 text-gray-800 ' />
            </button>
          </div>
        </div>

        {user && (
          <div className='ml-auto sm:flex-initial'>
            <div className='relative flex gap-1 cursor-pointer'>
              <Link to='/cart'>
                <ShoppingCart />
                {cartItems.length > 0 && (
                  <div className='absolute top-[-20px] right-[-15px] bg-red-500 text-white rounded-full w-6 h-6 text-[15px] flex items-center justify-center'>
                    {cartItems.length}
                  </div>
                )}
              </Link>
            </div>
          </div>
        )}

        {user == null ? (
          <div className='flex gap-3'>
            <Button className='bg-blue-400 text-white px-5 py-2 rounded hover:bg-blue-500 uppercase text-[15px]'>
              <Link to='/login'>Login</Link>
            </Button>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='primary'
                size='icon'
                className='rounded-full flex items-center'>
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt={user.name}
                    className='h-6 w-6 rounded-full'
                  />
                ) : (
                  <CircleUserRound className='h-6 w-6' />
                )}
                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel className='text-center font-semibold uppercase text-[16px]'>
                {user.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {user.role === 1 ? (
                  <Link to='/admin'>Dashboard</Link>
                ) : (
                  <Link to='/profile'>Profile</Link>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button onClick={handleLogout}>Logout</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Navbar;
