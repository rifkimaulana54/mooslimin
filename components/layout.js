import Head from 'next/head';
import styles from './layout.module.css';
import {
  Nav,
  Navbar,
  NavDropdown,
  Col,
  Row,
  // Container,
  Dropdown,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Footer from './footer/footer';
import { useRouter } from 'next/router';
import { AppBar, Box, Container, IconButton, InputBase, Menu, Toolbar, Button, MenuItem, Link } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ClearIcon from '@mui/icons-material/Clear';

const name = 'Errol Widhavian';
export const siteTitle = 'Next.js Sample Website';


export default function Layout({ children, home }) {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);


  const handleCollapse = (id) => {
    setClicked((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle state berdasarkan ID menu
    }));
  };

  useEffect(() => {
    const fetchMenus = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/menu/list");
        const data = await response.json();
        setMenus(data);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
      } finally {
        setIsLoading(false); // Menyembunyikan loading setelah fetch selesai
      }
    };

    fetchMenus();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickMenu = (event, menuId) => {
    setAnchorElMenu(event.currentTarget);
    setActiveMenuId(menuId);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
    setActiveMenuId(null);
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const styles = (theme) => ({
    popoverPaper: {
      width: '100%',
      height: '100%',
      maxHeight: 'unset',
      maxWidth: 'unset',
    },
  });

  const buildMenuHierarchy = (menus) => {
    const menuMap = {};
  
    menus?.forEach((menu) => {
      menuMap[menu.id] = { ...menu, children: [] };
    });
  
    const menuHierarchy = [];
  
    menus?.forEach((menu) => {
      if (menu.menu_parent) {
        menuMap[menu.menu_parent]?.children.push(menuMap[menu.id]);
      } else {
        menuHierarchy.push(menuMap[menu.id]);
      }
    });
  
    return menuHierarchy;
  };
  
  const menuHierarchy = buildMenuHierarchy(menus.data?.menus);
  
  const renderTopMenu = (menu) => (
    <div key={menu.id}>
      <Link
        href={menu.menu_url || '#'}
        sx={{ m: 2, color: 'text.secondary', textDecoration: 'none' }}
        aria-haspopup={menu.children.length > 0 ? "true" : "false"}
        onMouseOver={(event) => handleClickMenu(event, menu.id)}>
        {menu.menu_name}
        {menu.children.length > 0 && (
          <>
            {clicked[menu.id] ? <ArrowUpIcon /> : <ArrowDownIcon />}
            <Menu
              id="simple-menu"
              anchorEl={anchorElMenu}
              open={Boolean(anchorElMenu) && activeMenuId === menu.id}
              onClose={handleCloseMenu}
              MenuListProps={{ onMouseLeave: handleCloseMenu }}
              marginThreshold={0}
              elevation={0}
              slotProps={{
                paper: {
                  sx: {
                    mt: '20px',
                    width: '100%',
                    maxWidth: 'unset',
                    left: '0px',
                    right: '0px',
                  },
                },
              }}>
              <Container>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid 
                    container
                    direction="row"
                    justifyContent="center"
                    spacing={2}
                  >
                    {menu.children.map((submenu) => (
                      <Grid item xs={2} md={2} key={submenu.id}>
                        <MenuItem sx={{ justifyContent: 'center' }} onClick={handleCloseMenu}>
                          <b>{submenu.menu_name}</b>
                        </MenuItem>
                        {submenu.children.map((level3) => (
                            <MenuItem sx={{ justifyContent: 'center'}} onClick={handleCloseMenu}>{level3.menu_name}</MenuItem>
                        ))}
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Container>
            </Menu>
          </>
        )}
      </Link>
    </div>
  );
  

  const renderSideMenu = (menu) => (
    <Box key={menu.id} sx={{ p: 1, display: { md: 'none' } }}>
      {/* Parent Menu */}
      <Link
        href={menu.menu_target || '#'}
        id="margin-normal"
        sx={{ color: 'text.secondary' }}
        aria-haspopup={menu.children.length > 0 ? 'true' : 'false'}
        onClick={(event) => {
          if (menu.children.length > 0) {
            event.preventDefault();
            handleCollapse(menu.id); // Update state hanya untuk menu ini
          } else {
            router.push(menu.menu_url || '#');
          }
        }}
        >
        <Row>
          <Col xs={menu.children.length > 0 ? 10 : 12}>{menu.menu_name}</Col>
          {
            menu.children.length > 0 && (
              <Col xs="2">
                {clicked[menu.id] ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </Col>
            )
          }
        </Row>
      </Link>
  
      {/* Submenu */}
      {menu.children.length > 0 && (
        <Collapse in={clicked[menu.id] || false}>
          <Box sx={{p: 1, display: { md: 'none' } }}>
            <Link
              href={menu.menu_target || '#'}
              id="margin-normal"
              sx={{color: 'text.secondary' }}
              aria-haspopup="true"
              onClick={() => router.push('#')}>
              {menu.children.map((submenu) => renderSideMenu(submenu))}
            </Link>
          </Box>
        </Collapse>
      )}
    </Box>
  );
  

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Mooslimin - Tempat Belanja Pria yang #LakiBanget"
        />
        <meta
          property="og:image"
          content="/images/logo.svg" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="fixed-top">
        <div className="text-center bg-mooslimin-primary py-2">
          <div className="container txt-mooslimin-secondary">
            25% launching discount - For orders before 12PM - Diskon spesial  khusus launching (untuk pemesanan sebelum 12.00 WIB)
          </div>
        </div>
        <AppBar position="static" color="inherit" elevation={0}>
          <Container maxWidth="xl">
            <Toolbar>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                <img src="/images/logo.svg" alt="Mooslimin" width="144" height="40" />
              </Box>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ flexGrow: 0, display: {md: 'none' } }}
                onClick={(event) => {
                  event.preventDefault();
                  handleCollapse('sidebar_menu');
                }}
                >
                {clicked['sidebar_menu'] ? <ClearIcon /> : <MenuIcon />}
              </IconButton>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <img src="/images/logo.svg" alt="Mooslimin" width="100" height="40" />
              </Box>

              <Box sx={{ flexGrow: 8, display: { xs: 'none', md: 'flex' } }}>
                {isLoading ? (
                  ''
                ) : (
                  menuHierarchy.map((menu) => renderTopMenu(menu))
                )}
                {/* {isLoading ? (
                  ''
                ) : (
                  menus?.data?.menus?.map((menu, index) => (
                    <div key={index}>
                      <Link
                        href={menu.menu_url ||'#'}
                        id="margin-normal"
                        sx={{ m: 2, color: 'text.secondary' }}
                        aria-haspopup="true"
                        onClick={() => router.push(menu.menu_url)}
                      >
                        {menu.menu_name}
                      </Link>
                      <Menu
                        id={`simple-menu-${index}`}
                        anchorEl={anchorElMenu}
                        open={Boolean(anchorElMenu)}
                        onClose={handleCloseMenu}
                        MenuListProps={{ onMouseLeave: handleCloseMenu }}
                        marginThreshold={0}
                        elevation={0}
                        slotProps={{
                          paper: {
                            sx: {
                              mt: '20px',
                              width: '100%',
                              maxWidth: 'unset',
                              left: '0px',
                              right: '0px',
                            },
                          },
                        }}
                      >
                      </Menu>
                    </div>
                  ))
                )} */}
                {/* <div>
                  <Link
                    href="#"
                    aria-owns={anchorElMenu ? "simple-menu" : undefined}
                    aria-haspopup="true"
                    onClick={() => router.push("new-arrivals")}
                    onMouseOver={handleClickMenu}
                  >
                    Terbaru
                  </Link>
                  <Menu
                    // PopoverClasses={{ paper: props.classes.popoverPaper }}
                    id="simple-menu"
                    anchorEl={anchorElMenu}
                    open={Boolean(anchorElMenu)}
                    onClose={handleCloseMenu}
                    MenuListProps={{ onMouseLeave: handleCloseMenu }}
                    marginThreshold={0}
                    elevation={0}
                    slotProps={{
                      paper: {
                        sx: {
                          mt: '20px',
                          width: '100%',
                          maxWidth: 'unset',
                          left: '0px',
                          right: '0px',
                        },
                      }
                    }}
                  >
                    <Container>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid 
                          container
                          direction="row"
                          justifyContent="center"
                          alignItems="center" spacing={2}>
                          <Grid item xs={2} md={2} >
                            <MenuItem sx={{ justifyContent: 'center'}} onClick={handleCloseMenu} ><b>Setelan Harian</b></MenuItem>
                            <MenuItem sx={{ justifyContent: 'center'}} onClick={handleCloseMenu}>Kaos</MenuItem>
                            <MenuItem sx={{ justifyContent: 'center'}} onClick={handleCloseMenu}>Sriwal</MenuItem>
                            <MenuItem sx={{ justifyContent: 'center'}} onClick={handleCloseMenu}>Dompet</MenuItem>
                          </Grid>
                          <Grid item xs={2} md={2} >
                            <MenuItem sx={{ justifyContent: 'center'}} onClick={handleCloseMenu}><b>Ngantor Casual</b></MenuItem>
                            <MenuItem sx={{ justifyContent: 'center'}} onClick={handleCloseMenu}>Kemeja</MenuItem>
                            <MenuItem sx={{ justifyContent: 'center'}} onClick={handleCloseMenu}>Sepatu</MenuItem>
                            <MenuItem sx={{ justifyContent: 'center'}} onClick={handleCloseMenu}>Kaos</MenuItem>
                          </Grid>
                        </Grid>
                      </Box>
                    </Container>

                  </Menu>
                </div> */}
              </Box>

              <Search sx={{ flexGrow: 4, display: { xs: 'none', md: 'flex' }, border: "1px solid grey", borderRadius: "50px" }}>
                <SearchIconWrapper>
                  <SearchIcon sx={{fontSize: "15px"}} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  className='search-input-based'
                />
              </Search>

              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu}>
                  <img alt="" src="/images/component/navigation/person.svg" />
                </IconButton>
                <Menu
                  sx={{
                    mt: '45px', filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.32))",
                  }}
                  id="menu-appbar"
                  elevation={0}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}

                >
                  <Container>
                    <div>Akun Saya</div>

                  </Container>
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} >
                  <img alt="" src="/images/component/navigation/local_mall.svg" />
                </IconButton>
                <Menu
                  sx={{
                    mt: '45px', filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.32))",
                  }}
                  id="menu-appbar"
                  elevation={0}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}

                >
                  <Container>
                    <div>Akun Saya</div>

                  </Container>
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <label style={{ fontSize: "16px", alignItems: "center" }}>0</label>
              </Box>
            </Toolbar>
          </Container>
          <Box>
            <Box
              sx={{
                '& > :not(style)': {
                  // display: 'flex',
                  position: 'fixed',
                  justifyContent: 'space-around',
                },
              }}>
              <div>
                <Box sx={{ width: '50%' }}>
                  <Collapse orientation="horizontal" in={clicked['sidebar_menu'] || false}>
                    <Card sx={{ minWidth: 220, borderRadius: "0", height: "550px", backgroundColor: "#f2e4cc", color: "grey", display: { md: 'none' } }}>
                      <CardContent sx={{ maxHeight: '450px', overflowY: 'auto' }}>
                        {isLoading ? (
                          ''
                        ) : (
                          menuHierarchy.map((menu) => renderSideMenu(menu))
                        )}
                      </CardContent>
                    </Card>
                  </Collapse>
                </Box>
              </div>
            </Box>
          </Box>
        </AppBar>


        {/* <Navbar bg="light" expand="md" className="navbar-mooslimin">
          <Container>
            <Navbar.Brand href="" className="pe-5">
              <img src="/images/logo.svg" alt="Mooslimin" width="144" height="40" />
            </Navbar.Brand>
            <Navbar.Collapse id="navbarCollapse">
              <Nav className="me-auto mb-2 mb-md-0">
                <Nav.Link href="new-arrivals">Terbaru</Nav.Link>
                <NavDropdown title="Stelan Pria"
                  id="basic1"
                  className="dropdown-megamenu"
                  show={show}
                  onClick={() => router.push('/outfit')}
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
                >
                  <Container className="eventsNav pt-0 mt-0">
                    <Row>
                      <Col xs="12" md="4" className="text-left">
                        <Dropdown.Header>Catering</Dropdown.Header>
                        <Dropdown.Item>
                          <Nav.Link href="#home">Home</Nav.Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Nav.Link href="#home">Home</Nav.Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>
                          Classes
                        </Dropdown.Header>
                        <Dropdown.Item>
                          <Nav.Link href="#home">Home</Nav.Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Nav.Link href="#home">Home</Nav.Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Nav.Link href="#home">Home</Nav.Link>
                        </Dropdown.Item>
                        <Dropdown.Divider className="d-md-none" />
                      </Col>
                      <Col xs="12" md="4" className="text-left">
                        <Dropdown.Header>Rentals</Dropdown.Header>
                        <Dropdown.Item>
                          <Nav.Link href="#home">Home</Nav.Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Nav.Link href="#home">Home</Nav.Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>
                          Seasonal
                        </Dropdown.Header>
                        <Dropdown.Item>
                          <Nav.Link href="#home">Home</Nav.Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Nav.Link href="#home">Home</Nav.Link>
                        </Dropdown.Item>
                      </Col>
                      <Col xs="12" md="4" className="text-left">
                        <Dropdown.Header>
                          Rentals
                        </Dropdown.Header>
                        <Dropdown.Item>
                          <Nav.Link href="#home">Home</Nav.Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Nav.Link href="#home">Home</Nav.Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>
                          Seasonal
                        </Dropdown.Header>
                        <Dropdown.Item>
                          <Nav.Link href="#home">Home</Nav.Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Nav.Link href="#home">Home</Nav.Link>
                        </Dropdown.Item>
                      </Col>
                    </Row>
                  </Container>
                </NavDropdown>
                <NavDropdown title="Brand"
                  id="basic1"
                  className="dropdown-megamenu"
                  show={showBrand}
                  onClick={() => router.push('/brands')}
                  onMouseEnter={() => setShowBrand(true)}
                  onMouseLeave={() => setShowBrand(false)}
                >
                  <Container className="eventsNav pt-0 mt-0">
                    <Row>
                      <Col xs="12" md="4" className="text-left">
                        <Dropdown.Header>Catering</Dropdown.Header>
                        <Dropdown.Item>
                          <Nav.Link href="#home">Home</Nav.Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Nav.Link href="#home">Home</Nav.Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />

                      </Col>
                    </Row>
                  </Container>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
            <div className={styles.componentinputField}>
              <img className="{styles.icon16}" alt="" src="/images/component/navigation/search.svg" />
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Cari..."
                maxLength
                minLength
              />
            </div>
            <div className={styles.componentnavigationheaderMeChild + " mx-4"} />
            <div className={styles.rightIcon}>
              <div className={styles.div}>0</div>
              <CustomMenuLogin />
              <img
                className={styles.localMallIcon}
                alt=""
                src="/images/component/navigation/local_mall.svg"
              />
            </div>
          </Container>
        </Navbar> */}
      </header>
      <main>{children}</main>
      {/* {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )} */}
      <Footer />
    </div>
  );
}