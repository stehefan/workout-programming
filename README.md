## workout-programming
Webapp to manage programming for workouts including the possibility to add exercise videos to the programming, notes and
having an overview of the exercises and different workouts.

This is, as several other projects of mine, mostly a testing- and play-ground for trying NextJS and related technologies.

### Features
#### Program overview
![](./docs/images/overview_program.png)

A list of programs, which can hold different workouts.

#### Workout overview
![](./docs/images/overview_workout.png)

A list of workouts, which can hold different exercises. Each exercise shows the number of sets and reps, a video and the
possibility to add and adjust notes when necessary.

#### Exercise video integration
![](./docs/images/overlay_exercise_video.png)

The exercise video is displayed as an overlay on top of the workout information when clicked on the preview image in the
previous view. Right now, these videos can be hosted on any platform which is supported by 
[react-player](https://www.npmjs.com/package/react-player).

## Development
### Prerequisites
#### Node.js
This project expects Node.js version v20.17.0 or higher. Use e.g. ode Version Manager (NVM) to install and manage
Node.js versions. Find out more about NVM at https://github.com/nvm-sh/nvm.

Install the dependencies:

```bash
pnpm install
```

#### PostgreSQL
This project expects a PostgreSQL database that can be used by prisma to manage the database schema, migrations and 
data. See the [prisma documentation](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres)
for more information on how to configure your local environment and how to setup the database via the prisma CLI.

#### Clerk
This project uses [Clerk](https://clerk.com/) to manage authentication. You need to create an account and configure your
local environment to connect to your account for authentication. See the [Clerk documentation](https://docs.clerk.com/quickstarts/nextjs)
for more information on how to configure your local environment.

#### Husky / Git hooks
I use [husky](https://typicode.github.io/husky/) to manage git-hooks. It will get automatically installed as part of
the `pnpm install` command and creates a `.husky` folder in the project root in which you can add more git-hooks if
needed. Check out the husky documentation for more information. Adjust for your package manager of choice if you are not
using npm.

### Development

To run the development server, use the following command:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment
Right now, this project is deployed to Vercel automatically via a hook in vercel which runs the `build` command whenever
there is a change in this repository. Since this is a nextjs project, it can be hosted anywhere where else as long as
nodejs environment is available.
