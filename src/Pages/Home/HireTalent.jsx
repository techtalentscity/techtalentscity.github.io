import { Button } from "antd"
import Container from "../../components/Container"

const HireTalent = () => {
  return (
    <Container className={'mb-16'}>
        <div className="w-full bg-[#F3F3FF] rounded-3xl flex flex-col justify-center items-center">
            <div className="max-w-sm md:max-w-md flex flex-col justify-center gap-7 items-center text-center py-12">
                <h1 className="text-2xl md:text-4xl font-bold">Recruit TechTalent today!</h1>
                <p className="text-[#101010] text-lg">
                    Empower your projects <br /> with top-tier tech talent
                </p>
                <Button type="primary" block className="text-lg font-bold shadow-none py-5">Recruit TechTalent</Button>
            </div>
        </div>
    </Container>
  )
}

export default HireTalent