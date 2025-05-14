import { Link } from "@deskpro/app-sdk";
import { P1, Stack } from "@deskpro/deskpro-ui";

export default function DeprecationNotice(): JSX.Element {

    return (
        <Stack vertical padding={12} gap={20}>
            <P1>
                Jetbrains have announced the decision to deprecate Space: <Link style={{textDecoration: "underline"}} target="_blank" href={"https://blog.jetbrains.com/space/2024/05/27/the-future-of-space/"}>The Future of Space</Link>.
            </P1>
            <P1>
                Ask your admin to uninstall this app from your help desk as it will no longer
                be supported by Deskpro.
            </P1>
        </Stack>
    )
}