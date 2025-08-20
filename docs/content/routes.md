# Routes

In this project we use the `npm`package `react-router-dom` to handle routing between pages.

Inside `main.tsx` a router is defined and the configuration for the router exists in `src/routes/index.tsx`.

Some framworks like ex. Next.js comes with built in routing based on the filestructure.

## Create a new route

Firstly create a new folder in the [routes](../../src/components/) folder titled `mypage` (notice lowercase). Then create a file inside titled `index.tsx`.

If you want styling specific to this page also create a file called `mypage.module.css` and follow [the guide on styling](styling.md).

For our application to know this route/page exists and be able to navigate to it you have to add it to the router configuration [src/routes/index.tsx](../../src/routes/index.tsx):

```typescript
// add at top of page
import MyPage from './mypage'

// add inside <Routes>
<Route path="mypage" element={<MyPage />} />
```

If you want to navigate to this page you have to add links to it

Either add NavLink in Navbar:

```typescript
<NavLink to="mypage">My Page</NavLink>
```

or add a Link anywhere else in the project

```typescript
<Link to="mypage">My Page</Link>
```

Note: Remember to import Link or Navlink

Then you can code the page itself, it is a lot like [how you create a component](components.md)

```typescript

// all you imports at top of file

const MyPage = () => {

    // your code

    // example if you want this page to have all flashcards do this
    const flashcardsQuery = useQuery({
        queryKey: ["flashcards"],
        queryFn: getAllSets,
    });
    // no need to understand all here, just notice it calls getAllSets from the api folder


    return (
        <>
            <h1>This is my header</h1>
            <p>This is my text</p>
            {/* print the title of all flashcards */}
            {flashcardsQuery.status === "success" &&
                flashcardsQuery.data.map((flashcardset) => (
                    <p>{flashcardset.title}</p>
            ))}
        </h1>
    )
}

// then we export the function/page so that we can import it other places
export default MyPage

```

## If you are more curious

The `useQuery` function you may have noticed in the example is very practical to use when we deal with asynchronous functions (`async`) like when we want to get data from the server/backend.

There's plenty of things `react-query` can do if you want to research it more. In this case it makes it very simple to check the status of the query. Because if you try to show all flashcards with out a check to see if they actually have been fetched from the server you will get all sorts of errors as react tries to render something that does not exist yet.
